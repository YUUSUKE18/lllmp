import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean first = true;
        int n;

        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;
                if (b == ',') {
                    if (first) {
                        count++;
                        if (max == Long.MIN_VALUE || Long.parseLong(String.valueOf(cur)) > max) {
                            max = Long.parseLong(String.valueOf(cur));
                        }
                        first = false;
                    }
                    cur = 0;
                } else if (b >= '0' && b <= '9') {
                    // Read the number, handling potential multi-byte characters implicitly by reading byte by byte
                    // We need a way to accumulate the number across byte boundaries if we were not strictly parsing integers separated by commas.
                    // Since the input is guaranteed to be comma-separated integers, we can treat ',' as the delimiter and parse blocks of digits.
                    // A simpler approach for this specific case (reading from stream) is to buffer characters until a comma is hit, or handle number accumulation across reads.

                    // Let's reset the logic to focus on reading tokens separated by commas.
                }
            }
        }

        // Re-implementing the parsing logic based on tokenization for robustness against stream issues.
        // Since we are reading raw bytes and need to parse comma-separated integers, using String manipulation on the read buffer is safer if we assume input format validity.

        String input = new String(buf);
        
        // A cleaner approach: Read everything, split by comma, and process.
        // Since the problem requires strict stream reading similar to the examples, let's stick to that paradigm, 
        // assuming the numbers are correctly formed integers separated by commas in the stream.

        // Resetting variables for a fresh pass focusing on token extraction:
        count = 0;
        max = Long.MIN_VALUE;
        boolean foundAny = false;
        long currentNumber = 0;
        boolean inNumber = false;
        
        // Re-read the input stream content if we were to use a proper String split approach, but sticking to byte reading:

        // Let's re-process based on the structure of the example where we look for ',', and assume numbers are contiguous digits.
        // This requires buffering characters across reads properly. The previous attempt was flawed because `cur` would only hold partial numbers if a read operation split a number.

        // Given the constraints and pattern matching the examples, we must parse sequentially.
        
        // Let's use a String-based approach internally for simplicity in parsing comma-separated integers from the input stream context, 
        // even though the example code used raw byte manipulation. Since standard Java I/O is involved, using buffered reading into a string might be cleaner if allowed. 
        // Sticking to the spirit of the examples (raw byte processing):

        long tempMax = Long.MIN_VALUE;
        int numCount = 0;
        boolean anyNumberFound = false;
        String currentToken = "";
        
        // Read all available data into a string buffer for easier splitting, simulating reading until EOF.
        // This requires reading the entire stream first if we want to use String.split effectively on arbitrary delimiters across byte boundaries.
        // Since I must strictly adhere to reading from System.in via BufferedInputStream:

        // Attempt 3: Sticking strictly to the streaming byte method, focusing only on digits and commas.
        
        long finalCount = 0;
        long finalMax = Long.MIN_VALUE;
        boolean foundValidNumber = false;
        long currentVal = 0;
        boolean parsingNum = false;

        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;

                if (b == ',') {
                    if (parsingNum) {
                        // Process the number just finished
                        finalCount++;
                        if (currentVal > finalMax) {
                            finalMax = currentVal;
                        }
                        foundValidNumber = true;
                        currentVal = 0;
                        parsingNum = false;
                    }
                } else if (b >= '0' && b <= '9') {
                    // Build the number. Since we are reading byte by byte, this relies on ASCII compatibility (which it is for digits).
                    currentVal = currentVal * 10 + (b - '0');
                    parsingNum = true;
                }
            }
        }

        // Handle the last number if the stream ends without a trailing comma
        if (parsingNum) {
            finalCount++;
            if (currentVal > finalMax) {
                finalMax = currentVal;
            }
            foundValidNumber = true;
        }

        if (finalCount == 0) {
            // If no numbers were found, max should be handled appropriately. Assuming if count is 0, the output follows.
            // If we strictly follow "count=<個数> max=<最大値>", and nothing was read, count=0, max depends on interpretation (e.g., minimum long value).
        }

        if (finalCount > 0) {
             System.out.println("count=" + finalCount + " max=" + finalMax);
        } else {
            // If no valid numbers were found, we output count=0 and a sensible default for max if necessary, 
            // but let's assume the specification implies that if no elements exist, count is 0.
             System.out.println("count=0 max=" + Long.MIN_VALUE); // Or handle based on strict requirement if input guarantees numbers exist.
        }
    }
}
