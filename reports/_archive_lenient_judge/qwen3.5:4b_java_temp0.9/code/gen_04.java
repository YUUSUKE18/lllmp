import java.util.Scanner;
import java.util.stream.LongStream;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String line = sc.nextLine();
            
            LongStream.of(line.trim().split(","))
                .filter(s -> s != null && !s.isEmpty() && s.length() == 1 && Character.isDigit(s.charAt(0))) // integer parsing check via length and digit to handle empty/whitespace/non-integers gracefully in split
                .mapToLong(Long::parseLong)
                .distinct()
                .count();

            sc.nextLine();
        } else {
            System.out.println("count=0 sum=0");
        }

    }
}
