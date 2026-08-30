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
                        if (!foundFirst || (long) c > max) {
                            max = c;
                        }
                        inNumber = false;
                    }
                } else if (b >= '0' && b <= '9') {
                    // Read number. Since input is comma-separated integers, we read them directly.
                    // We need a way to parse the full integer string, which is tricky with this byte-by-byte reading style 
                    // designed for character streams like in examples. Let's switch to a more robust tokenizing approach if possible, 
                    // or assume standard input stream behavior where we can read tokens separated by commas and whitespace.

                    // Given the strict requirement of handling comma-separated integers from standard input, 
                    // reading line by line might be simpler than byte buffering for this specific task structure, 
                    // although the examples used buffered reading. Let's adapt the logic to handle the stream flow correctly.

                    // Reverting to a simpler tokenization approach based on splitting the whole input line/stream if possible, 
                    // or sticking strictly to the provided example style which implies raw byte reading.
                    
                    // Since we are dealing with integers separated by commas, let's process the stream as strings/tokens.
                }
            }
        }

        // Due to the complexity of parsing comma-separated tokens robustly using the exact byte-level method 
        // from the examples (which seem designed for character streams), let's use String reading which is more idiomatic 
        // for this type of input structure, even if it deviates slightly from pure byte manipulation.

        // Reset and re-implement using a string/token approach suitable for CSV-like input processing.
        
        // Since the prompt requires strict adherence to the format (reading standard input), we must assume 
        // the stream contains only the comma-separated integers, potentially separated by whitespace.
        // Let's read the entire input as a string and process it.
        
        java.util.Scanner scanner = new java.util.Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            String[] parts = line.split(",");
            
            long actualCount = 0;
            long actualMax = Long.MIN_VALUE;
            boolean hasElements = false;

            for (String part : parts) {
                // Trim whitespace to handle ' ', '\t', '\n', '\r' implicitly handled by split, but strip any remaining space if input was messy.
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    try {
                        long value = Long.parseLong(trimmedPart);
                        actualCount++;
                        if (value > actualMax) {
                            actualMax = value;
                        }
                        hasElements = true;
                    } catch (NumberFormatException e) {
                        // Ignore elements that are not valid integers
                    }
                }
            }

            if (actualCount > 0) {
                System.out.println("count=" + actualCount + " max=" + actualMax);
            } else {
                // If no valid integers were found, we still output the counts based on what was processed (0 elements).
                System.out.println("count=0 max=" + Long.MIN_VALUE); // Or handle as per precise error spec if needed, default to standard logic.
            }
        } else {
             // Handle empty input case
             System.out.println("count=0 max=" + Long.MIN_VALUE);
        }
    }
}
