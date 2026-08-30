import java.util.Scanner;
import java.util.stream.IntStream;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            IntStream.of(line.split(","))
                    .mapToInt(Integer::parseInt)
                    .filter(n -> !Double.isNaN(n)) // 整数として解釈できない要素をフィルタリング（実際は Integer.parseInt が例外を投げるが、ここでは安全に処理するため）
                    .forEach(System.out::println); 
        } else {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
        }

    }
}
