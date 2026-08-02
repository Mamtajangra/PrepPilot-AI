from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from app.database import get_db
from app.models.user import User
from app.schemas.user import (
    UserCreate,
    UserLogin,
    UserResponse,
    Token,
)

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    decode_access_token,
    oauth2_scheme,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# =========================
# Register User
# =========================
@router.post("/register", response_model=UserResponse)
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        hashed_password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# =========================
# Login User
# =========================
@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    print("STEP 1")

    db_user = db.query(User).filter(
        User.email == form_data.username
    ).first()

    print("STEP 2", db_user)

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    print("STEP 3")

    ok = verify_password(
        form_data.password,
        db_user.hashed_password,
    )

    print("STEP 4", ok)

    if not ok:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    print("STEP 5")

    access_token = create_access_token(
        data={"sub": db_user.email}
    )

    print("STEP 6")

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }

# =========================
# Current Logged-in User
# =========================
def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    print("=" * 50)
    print("TOKEN:", token)

    payload = decode_access_token(token)
    print("PAYLOAD:", payload)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    email = payload.get("sub")
    print("EMAIL:", email)

    user = db.query(User).filter(
        User.email == email
    ).first()

    print("USER:", user)
    print("=" * 50)

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user

@router.get("/me", response_model=UserResponse)
def get_me(
    current_user: User = Depends(get_current_user),
):
    return current_user