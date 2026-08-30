import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean foundFirst = false;

        int n;
        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;

                if (b == ',') {
                    count++;
                } else if (b >= '0' && b <= '9') {
                    long current = 0;
                    for (int j = i; j < n; j++) {
                        if (buf[j] != ',') {
                            current = current * 10 + (buf[j] - '0');
                        } else {
                            // Found a number, process it
                            if (count > 0) {
                                if (!foundFirst || current > max) {
                                    max = current;
                                }
                                count--;
                                foundFirst = false; // Reset flag after processing one number block
                            }
                            break;
                        }
                    }
                }
            }
        }

        // Handle the case where the input ends without a trailing comma, or if numbers are read sequentially.
        // A simpler approach is to use String splitting for robustness with arbitrary whitespace/newline handling during integer parsing.

        // Re-implementing using a stream approach which is generally cleaner for delimited data in Java contest settings, 
        // especially since the example suggests reading raw bytes and parsing manually (though the requested output format implies robust tokenization).
        
        // Since the provided examples show manual byte reading, we stick to that style but simplify the goal: extract numbers separated by commas.

        // Resetting state for a cleaner interpretation matching typical competitive programming input handling:
        count = 0;
        max = Long.MIN_VALUE;
        boolean isFirstNumber = true;

        // A simpler approach, assuming standard space/newline separation for the whole sequence if not explicitly handled by commas as delimiters.
        // Given the specification "カンマ区切りの整数列" and ignoring surrounding whitespace:

        String input = new String(buf);
        
        // Extracting numbers based on comma delimiter, skipping extraneous whitespace is hard in this byte-reading style without buffer management state tracking the position perfectly.
        // Let's focus solely on finding numbers separated by commas within the raw stream.

        int currentNumber = 0;
        boolean readingNumber = false;
        long finalCount = 0;
        long finalMax = Long.MIN_VALUE;

        for (int i = 0; i < buf.length; i++) {
            int b = buf[i] & 0xff;

            if (b == ',') {
                // If we were reading a number, finalize it.
                if (readingNumber) {
                    finalCount++;
                    if (currentNumber > finalMax) {
                        finalMax = currentNumber;
                    }
                    currentNumber = 0;
                    readingNumber = false;
                }
            } else if (b >= '0' && b <= '9') {
                // Build the number
                currentNumber = currentNumber * 10 + (b - '0');
                readingNumber = true;
            }
        }

        // Check for the last number if the stream doesn't end with a comma
        if (readingNumber) {
            finalCount++;
            if (currentNumber > finalMax) {
                finalMax = currentNumber;
            }
        }


        if (finalCount == 0) {
             // If no valid numbers were found, we can output based on the logic flow, although typically count=0 max=MIN_VALUE might be expected.
             // We assume if the input was empty or only non-numeric text, count remains 0.
        }

        System.out.println("count=" + finalCount + " max=" + finalMax);
    }
}
