#!/usr/bin/env python3
"""
Generate encryption key for API key storage
"""
import os
import base64

def generate_encryption_key():
    """Generate a secure encryption key for API key storage"""
    key = base64.urlsafe_b64encode(os.urandom(32)).decode()
    return key

if __name__ == "__main__":
    key = generate_encryption_key()
    print("Generated encryption key:")
    print(key)
    print("\nAdd this to your .env file as:")
    print(f"ENCRYPTION_KEY={key}")
