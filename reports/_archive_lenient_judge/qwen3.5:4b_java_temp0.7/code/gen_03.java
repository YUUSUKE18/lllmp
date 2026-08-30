import java.util.Scanner;
import java.util.stream.LongStream;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        if (!scanner.hasNext()) return;
        
        String inputLine = scanner.nextLine();
        
        // 空白を除去し、整数列に分割して処理可能なものだけ抽出
        LongStream stream = java.util.stream.Stream.of(inputLine.split(","))
            .filter(s -> s.trim().matches("-?[0-9]+")) 
            .map(Long::parseLong)
            .distinct();
            
        long count = stream.count();
        long sum = stream.sum();
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
