import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNext()) {
            System.out.println("count=0 sum=0");
            return;
        }

        int countLine = 0;
        try {
            String firstLine = scanner.nextLine();
            if (firstLine.trim().isEmpty()) {
                System.out.println("count=0 sum=0");
                return;
            }
            int n = Integer.parseInt(firstLine.trim());
            countLine++;
        } catch (NumberFormatException e) {
            System.out.println("count=0 sum=0");
            return;
        }

        long sum = 0;
        int actualCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                // Attempt to parse the entire line as integers separated by whitespace
                // The problem says "2nd line onwards, integers arranged 1 per line", 
                // but also says "ignore lines that cannot be interpreted as integers".
                // If a line contains multiple tokens, they should probably all be read.
                // However, the spec says "integers arranged one per line".
                // Let's assume if parsing fails (e.g., text present), skip the line.
                // If it parses successfully (even if empty or just whitespace), process it.
                
                String[] tokens = line.trim().split("\\s+");
                for (String token : tokens) {
                    if (token.isEmpty()) continue;
                    
                    try {
                        long val = Long.parseLong(token);
                        sum += val;
                        actualCount++;
                    } catch (NumberFormatException e) {
                        // If parsing fails, we ignore this specific number/token.
                        // Since the spec says "ignore lines that cannot be interpreted as integers",
                        // and implies robustness, skipping invalid tokens is safer than skipping whole lines
                        // unless the line is definitely not a list of integers.
                        // However, strict interpretation: "lines that cannot be interpreted as integers" -> skip line.
                        // But if we have mixed content, it's ambiguous.
                        // Given "integers arranged one per line", likely each line is meant to be an integer.
                        // If a line has garbage, the whole line might be considered uninterpretable?
                        // Let's try to parse the first token. If that fails, skip the line entirely?
                        // Or parse all valid tokens?
                        // Re-reading: "Actually read integers only" -> implies robustness.
                        // "Integer interpretation impossible lines also ignore" -> ambiguous if partial success occurs.
                        // Given typical competitive programming inputs for this spec, 
                        // it's safer to assume each line contains exactly one integer or is garbage.
                        // If we encounter a line where the first token is not a valid long, skip the line?
                        // But what if there are multiple numbers on a line (violating "1 per line" but possible)?
                        // The spec says "2nd line onwards integers arranged 1 per line". This is a description of expected format.
                        // But then it says "actually read only the integers that exist" and "ignore lines...".
                        // Let's adopt: Try to parse all tokens in the line. If any token is valid int, process it.
                        // If the line contains NO valid integers, ignore the line.
                    }
                }
            } catch (Exception e) {
                // If parsing logic throws an error for some reason, skip this line
            }
        }

        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
