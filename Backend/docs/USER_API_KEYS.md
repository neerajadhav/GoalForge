# User API Key Management

## Overview

Users can now manage their own Gemini API keys through the frontend profile section. This allows for better security and personalized API usage tracking.

## How it works

1. **User Registration/Login**: Users can sign up and log in as before
2. **Profile Management**: In the Profile section, users can:
   - Add their own Gemini API key
   - Update their existing API key
   - Delete their API key
3. **API Usage**: When users make AI-powered requests, the system uses their personal API key
4. **Fallback**: If a user hasn't set their API key, the system falls back to the global API key (if configured)

## Setting up API Keys

### For Users (Frontend)
1. Log in to your account
2. Go to Profile section
3. Find the "Gemini API Key" card
4. Enter your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
5. Click "Save Key"

### For Administrators (Backend)
1. Set `GEMINI_API_KEY` in `.env` file as fallback
2. Set `ENCRYPTION_KEY` for secure API key storage
3. Optionally configure `GEMINI_MODEL` for model selection

## Security Features

- **Encryption**: All user API keys are encrypted before storage using Fernet encryption
- **No Exposure**: API keys are never sent back to the frontend after storage
- **User Control**: Users can update or delete their keys at any time

## Environment Variables

```bash
# Optional fallback API key (for users without personal keys)
GEMINI_API_KEY=your_fallback_key_here

# Required encryption key for user API key storage
ENCRYPTION_KEY=your_generated_encryption_key_here

# Optional model selection
GEMINI_MODEL=gemini-1.5-flash
```

## Generating Encryption Key

Run the helper script to generate a secure encryption key:

```bash
python generate_encryption_key.py
```

## Database Migration

If upgrading from a previous version, run the migration to add the API key column:

```bash
python add_gemini_key_migration.py
```
