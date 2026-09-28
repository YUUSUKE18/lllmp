import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        int c = 0;
        long max = Long.MIN_VALUE;
        boolean first = true;

        int n;
        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;
                if (b == ',') {
                    c++;
                } else if (b != ' ' && b != '\t' && b != '\n' && b != '\r') {
                    try {
                        // Read integer from the byte sequence
                        int val = (b - '0'); // Assuming single digit for simplicity based on examples, though the requirement implies full 64-bit integers.
                                           // Since the input is a stream of integers separated by commas, we need to parse numbers correctly.
                                           // The provided examples suggest the input is space/newline separated words or digits.
                                           // For comma-separated integers, we read until a comma and parse the number.

                        // A more robust way for general integer parsing from a stream of bytes might be needed if multi-digit numbers are expected without explicit delimiters other than commas.
                        // Given the structure is "comma-separated integers", let's assume the input consists of digits possibly separated by commas and whitespace.
                        // Since we only care about counting and finding max, let's focus on extracting valid numbers.

                        // Re-implementing parsing for comma-separated integers: read tokens separated by ','
                        // This requires buffering more context than just byte-by-byte scanning might provide easily without full string processing or careful state management across reads.
                        // Since the provided examples use a very low-level stream reading, we'll adapt that style to extract numbers sequentially.

                    } catch (Exception e) {
                        // Ignore if parsing fails for non-digit characters encountered in this context
                    }
                }
            }
        }

        // Due to the ambiguity of how comma-separated integers are encoded byte-by-byte in the examples, 
        // we will switch to reading the entire input as a string and splitting it, which is much more standard for this type of task, 
        // although the provided boilerplate strongly implies low-level stream processing.

        // Let's assume the input contains only comma-separated integers potentially padded by whitespace.
        String input = new String(buf); // This read is insufficient as it doesn't handle streams correctly for multi-byte numbers or complex tokenization based on byte reading alone.

        // Reverting to a standard approach that handles the *intent* of the problem, as the boilerplate examples seem tailored to specific character sequences rather than general number parsing:
        
        java.util.Scanner scanner = new java.util.Scanner(System.in);
        StringBuilder numbers = new StringBuilder();
        
        // Read all tokens separated by comma (ignoring whitespace)
        while (scanner.hasNext()) {
            String token = scanner.next();
            if (!token.isEmpty()) {
                try {
                    long num = Long.parseLong(token);
                    numbers.append(num).append(",");
                } catch (NumberFormatException e) {
                    // Ignore non-integer tokens if they appear
                }
            }
        }

        String result = numbers.toString();
        if (result.length() > 1) {
            result = result.substring(0, result.length() - 1); // Remove trailing comma
        }

        if (result.isEmpty()) {
            System.out.println("count=0 max=-9223372036854775808"); // Or handle as per specification for empty input, using min long value if no numbers found.
        } else {
            String[] parts = result.split(",");
            int count = 0;
            long currentMax = Long.MIN_VALUE;

            for (String part : parts) {
                if (!part.trim().isEmpty()) {
                    try {
                        long num = Long.parseLong(part.trim());
                        count++;
                        if (num > currentMax) {
                            currentMax = num;
                        }
                    } catch (NumberFormatException e) {
                        // Ignore parts that are not valid long integers
                    }
                }
            }

            System.out.println("count=" + count + " max=" + currentMax);
        }
    }
}
