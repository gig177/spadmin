def removeSpecialChars(text):
    return ''.join(e for e in text if e.isalnum())
