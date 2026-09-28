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
                    long val = 0;
                    for (int j = i; j < n; j++) {
                        int next_b = buf[j] & 0xff;
                        if (next_b == ',') {
                            break;
                        }
                        // Read the number
                        val = val * 10 + (next_b - '0');
                    }

                    // Process the extracted number
                    if (val > 0) { // Check if it was a valid non-empty sequence of digits
                        if (!foundFirst || val > max) {
                            max = val;
                            foundFirst = true;
                        }
                    }
                }
            }
        }

        // This approach is complex due to the strict 1-line output requirement and need to correctly handle delimiters.
        // A simpler, more standard way to parse comma-separated integers might be easier if we assume input correctness,
        // but strictly adhering to reading raw bytes and parsing as in examples:

        // Reset logic for a cleaner parse focusing only on numbers separated by commas.
        count = 0;
        max = Long.MIN_VALUE;
        boolean firstElementFound = false;

        // Re-read input or use an alternative method if strictly necessary to handle arbitrary spacing/newlines robustly.
        // Given the example format, we assume comma separation is the primary delimiter.
        String input = new String(buf); // This won't work well for stream reading across multiple calls.

        // Let's stick to processing the stream content as if it were a string, focusing on extracting numbers between commas.
        
        // A robust implementation of parsing comma-separated integers from a stream is complex within this iterative byte reading style
        // without buffering the whole input first. Since we must follow the spirit of the examples (byte manipulation):

        long currentNumber = 0;
        boolean inNumber = false;
        int lineCount = 0; // Reusing count for what was intended to be element count based on example structure.

        // To correctly handle arbitrary whitespace/newlines as per "ignore empty elements and surrounding whitespace",
        // we must read the entire input chunk and process it sequentially.
        
        // Since this is difficult to retrofit cleanly into the byte reading loop without complex state management across lines,
        // we will simplify the parsing based on the constraints: parse all integers separated by commas.

        long finalCount = 0;
        long finalMax = Long.MIN_VALUE;
        boolean elementFound = false;

        // Re-implementing stream reading for clarity based on typical CP input style (assuming input is available):
        // Since the previous loop structure was byte-by-byte and hard to reconstruct tokens across lines easily,
        // we will use a standard String/Scanner approach internally if byte manipulation proves too brittle for this specific format,
        // but since examples demand byte processing, we must find a way.

        // Fallback: Read all input into a string buffer first to simplify the tokenization while respecting constraints.
        // If reading from System.in directly is required, relying on buffering and careful state tracking across line boundaries is necessary.

        // Given the difficulty of extracting arbitrary comma-separated tokens purely by raw byte stream iteration mimicking the simple examples:
        // Let's assume input comes sequentially and we extract numbers when they appear separated by commas.

        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;
                if (b == ',') {
                    // A comma marks the end of a number, if we were accumulating one.
                } else if (b >= '0' && b <= '9') {
                    // Accumulate digits to form a number. This requires knowing where the number starts and ends relative to commas.
                    // This is inherently context-dependent on the previous character being a digit or a comma boundary marker.

                    // Due to the complexity of stateful tokenization across arbitrary byte boundaries, 
                    // we will assume standard Java input reading if byte manipulation fails to cleanly replicate the structure defined by Example formats.
                    // However, sticking strictly to the prompt's example style means this must be solvable via byte stream logic.

                    // *Attempting a simplified state machine based on the expectation of comma separation:*
                }
            }
        }
        
        // Final attempt using String parsing after reading all data (which might violate pure single-pass mandate but ensures correctness for complex delimiters):
        java.io.BufferedReader reader = new java.io.BufferedReader(new java.io.InputStreamReader(in));
        String line;
        StringBuilder fullText = new StringBuilder();

        while ((line = reader.readLine()) != null) {
            fullText.append(line).append('\n');
        }
        
        // Process the collected text to find comma-separated numbers, ignoring surrounding whitespace/empty tokens.
        String content = fullText.toString().trim();

        String[] parts = content.split(",");

        if (parts.length == 0 || (parts.length == 1 && parts[0].isEmpty())) {
            System.out.println("count=0 max=" + Long.MIN_VALUE); // Or handle as per convention if no numbers found
            return;
        }

        long calculatedCount = 0;
        long calculatedMax = Long.MIN_VALUE;
        boolean first = true;

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (!trimmedPart.isEmpty()) {
                try {
                    long val = Long.parseLong(trimmedPart);
                    calculatedCount++;
                    if (first || val > calculatedMax) {
                        calculatedMax = val;
                        first = false;
                    }
                } catch (NumberFormatException e) {
                    // Ignore elements that are not valid integers (as per specification)
                }
            }
        }

        // Output the result in the required format. We must output exactly 1 line.
        System.out.println("count=" + calculatedCount + " max=" + calculatedMax);
    }
}
