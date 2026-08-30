import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String targetLine = sc.nextLine();
        if (targetLine.trim().isEmpty()) return;
        
        BigInteger target = null;
        try {
            target = new BigInteger(targetLine.trim());
        } catch (NumberFormatException e) {
            return;
        }

        int count = 0;
        Scanner lineScanner = new Scanner(System.in);
        while (lineScanner.hasNext()) {
            String line = lineScanner.nextLine();
            if (line.trim().isEmpty()) continue;
            
            BigInteger value;
            try {
                value = new BigInteger(line.trim());
            } catch (NumberFormatException e) {
                continue;
            }

            if (target == null) {
                target = value;
                continue;
            }

            BigInteger complement = target.subtract(value);
            
            for (BigInteger i = BigInteger.ONE; i.compareTo(target) <= 0; i++) {
                if (complement.equals(i)) {
                    count++;
                    break;
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
