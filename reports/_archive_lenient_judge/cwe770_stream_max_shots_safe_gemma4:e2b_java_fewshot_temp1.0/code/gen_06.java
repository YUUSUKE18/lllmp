import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundFirst = false;

        int n;
        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;
                if (b == ',') {
                    count++;
                } else if (b >= '0' && b <= '9') {
                    long num = 0;
                    for (int j = i; j < n; j++) {
                        int charVal = buf[j] & 0xff;
                        if (charVal >= '0' && charVal <= '9') {
                            num = num * 10 + (charVal - '0');
                        } else {
                            break; // End of number sequence or invalid character encountered after digits
                        }
                    }
                    
                    // Check if we actually parsed a full number before the comma or end of buffer
                    if (num > 0 || (i + 1 < n && buf[i+1] == ',')) {
                        if (!foundFirst || num > max) {
                            max = num;
                            foundFirst = true;
                        }
                    }
                }
            }
        }

        // Handle the last number if the input doesn't end with a comma
        // This is tricky because the loop above primarily counts commas. 
        // We need a stateful parsing approach to correctly identify integers separated by commas, ignoring surrounding whitespace.

        // Rereading using String manipulation for robustness given the requirement "comma-separated integers" and "ignore surrounding whitespace"
        
        // Resetting logic for robust parsing based on typical input format handling 
        // (Since the previous attempt was complex due to byte-level reading constraints)

        StringBuilder input = new StringBuilder();
        try {
            while ((n = in.read(buf)) > 0) {
                input.append(new String(buf, 0, n));
            }
        } finally {
            in.close();
        }


        String data = input.toString();
        if (!data.isEmpty()) {
            // Split by comma and filter out empty strings resulting from multiple commas or leading/trailing commas
            String[] parts = data.split(",");
            long validCount = 0;
            long validMax = Long.MIN_VALUE;

            for (String part : parts) {
                // Trim whitespace from the part
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    try {
                        long num = Long.parseLong(trimmedPart);
                        validCount++;
                        if (num > validMax) {
                            validMax = num;
                        }
                    } catch (NumberFormatException e) {
                        // Ignore elements that are not valid long integers
                    }
                }
            }

            if (validCount == 0) {
                // If no valid numbers were found, handle appropriately. Assuming count=0, max is undefined or handled by constraints.
                // For simplicity, if no numbers exist, we can set max to a safe default or adhere strictly.
                // Since the problem implies integers *are* present, we rely on the calculated values.
            } else {
                 System.out.println("count=" + validCount + " max=" + validMax);
            }
        }
    }
}
