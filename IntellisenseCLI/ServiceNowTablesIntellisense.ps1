$sec = Read-Host "Enter instance password" -AsSecureString                  # Prompt the user for the password as a SecureString (characters not shown while typing)

$ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec)          # Convert the SecureString into plain text in memory
$pwd = [Runtime.InteropServices.Marshal]::PtrToStringAuto($ptr)

[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)                       # Immediately wipe the unmanaged memory location to reduce exposure

$env:APP_PASSWORD = $pwd                                                    # Store the plain password in an environment variable, so the Node.js script can access it

node "$PSScriptRoot\GenerateIntellisense.js"                                # Run the Node.js script located in the same folder as this PowerShell script

$env:APP_PASSWORD = $null                                                   # Clear the environment variable after the Node.js script finishes to avoid leaks