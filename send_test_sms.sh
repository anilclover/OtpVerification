#!/bin/bash

# Function to send test SMS with random OTP
send_test_sms() {
    OTP=$(shuf -i 1000-9999 -n 1)
    echo "Sending SMS with OTP: $OTP"
    adb emu sms send +1234567890 "Your verification code is $OTP"
    echo "SMS sent successfully!"
}

# Check if ADB is available
if ! command -v adb &> /dev/null; then
    echo "ADB not found. Please install Android SDK platform-tools."
    exit 1
fi

# Check if emulator is running
if ! adb devices | grep -q emulator; then
    echo "No emulator found. Please start Android emulator first."
    exit 1
fi

# Send test SMS
send_test_sms