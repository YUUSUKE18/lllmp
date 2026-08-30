import java.util.Scanner;
import java.util.stream.IntStream;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            IntStream.of(line.split(","))
                    .mapToInt(Integer::parseInt)
                    .filter(n -> !Double.isNaN(n))
                    .count() > 0 ? 
                System.out.println("count=" + IntStream.of(line.split(",")).mapToLong(Long::parseLong).max().orElse(1L) + " max=" + IntStream.of(line.split(",")).mapToLong(Long::parseLong).filter(l -> !Double.isNaN(l)).min().orElse(0)) : 
                System.out.println("count=0 max=0");
        } else {
            System.out.println("count=0 max=0");
        }
    }
}
