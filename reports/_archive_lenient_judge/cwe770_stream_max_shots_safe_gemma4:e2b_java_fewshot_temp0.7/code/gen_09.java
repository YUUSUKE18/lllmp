import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundFirst = false;
        int c = 0;
        boolean inNumber = false;

        while ((c = in.read(buf)) > 0) {
            for (int i = 0; i < c; i++) {
                int b = buf[i] & 0xff;
                if (b == ',') {
                    if (inNumber) {
                        count++;
                        if (!foundFirst || (c > 0 && String.valueOf(Integer.parseInt(new String(buf, i, c))) > max)) {
                            max = Integer.parseInt(new String(buf, i, c));
                        }
                    }
                    inNumber = false;
                } else if (b >= '0' && b <= '9') {
                    // Read the whole number sequence until a separator or non-digit is found for simplicity in this structure, 
                    // but since we need to handle variable length and potential errors robustly, 
                    // let's re-read based on typical CSV parsing approach.
                    // A simpler stream reading approach focusing only on numbers and commas:
                    if (!inNumber) {
                        // Start of a number
                        String numStr = "";
                        int j = i;
                        while (j < c && buf[j] >= '0' && buf[j] <= '9') {
                            numStr += String.valueOf(buf[j] - '0');
                            j++;
                        }
                        if (!numStr.isEmpty()) {
                            try {
                                long val = Long.parseLong(numStr);
                                if (count == 0) {
                                    max = val;
                                } else {
                                    if (val > max) {
                                        max = val;
                                    }
                                }
                                count++;
                            } catch (NumberFormatException e) {
                                // Ignore if parsing fails, though the specification implies valid integers.
                            }
                        }
                        i = j - 1; // Adjust outer loop index
                    }
                }
            }
        }

        // Re-implementing a cleaner state machine approach for robust CSV parsing:
        count = 0;
        max = Long.MIN_VALUE;
        boolean first = true;
        boolean inSequence = false;
        long currentNumber = 0;

        in = new BufferedInputStream(System.in, 1 << 16); // Reset stream reading for clean processing (this is tricky with buffered input unless we read everything once)
        // Since the previous loop structure was complex and error-prone for variable length parsing across buffer boundaries, 
        // let's reset and use a simpler approach focusing on tokenizing based on commas.

        // --- Rereading input stream contents if possible, or assuming the requirement implies reading all tokens sequentially. ---
        // Given the constraint of reading from standard input once: we must process the buffer as read.
        
        // Resetting variables for a proper sequential scan across the buffer content (which is what the examples suggest):
        count = 0;
        max = Long.MIN_VALUE;
        boolean inToken = false;
        long currentVal = 0;

        for (int i = 0; i < c; i++) {
            int b = buf[i] & 0xff;

            if (b == ',') {
                if (inToken) {
                    // End of a token found, process the number
                    count++;
                    if (currentVal > max) {
                        max = currentVal;
                    }
                    currentVal = 0;
                    inToken = false;
                }
            } else if (b >= '0' && b <= '9') {
                // Build the number. Since we are reading byte by byte, we need to handle multi-byte numbers correctly,
                // but since input is assumed to be ASCII digits separated by commas, standard parsing logic applies.
                // We must collect all consecutive digits until a comma or non-digit is hit.
                currentVal = currentVal * 10 + (b - '0');
                inToken = true;
            }
        }

        // Handle the last token if the input does not end with a comma
        if (inToken) {
            count++;
            if (currentVal > max) {
                max = currentVal;
            }
        }

        // Output the result exactly as specified
        System.out.println("count=" + count + " max=" + max);
    }
}
