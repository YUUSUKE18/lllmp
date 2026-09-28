import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long sum = 0;
        int count = 0;
        boolean firstLine = true;

        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long val = Long.parseLong(line.trim());
                
                if (firstLine) {
                    // Line 1 is the count n, do not include in sum/count
                    firstLine = false;
                } else {
                    sum += val;
                    count++;
                }
            } catch (NumberFormatException e) {
                // Ignore lines that cannot be interpreted as integers
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
