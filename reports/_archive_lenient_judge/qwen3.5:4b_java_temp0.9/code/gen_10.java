import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        Set<Long> distinctIntegers = new HashSet<>();
        
        while (scanner.hasNext()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty() || line.matches("\\s*")) {
                continue;
            }

            String[] parts = line.split(",");
            
            for (String part : parts) {
                part = part.trim();
                try {
                    long value = Long.parseLong(part);
                    distinctIntegers.add(value);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }

        int count = distinctIntegers.size();
        long sum = 0;
        
        for (long val : distinctIntegers) {
            sum += val;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
