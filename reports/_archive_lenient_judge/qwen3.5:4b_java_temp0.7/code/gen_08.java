import java.util.Scanner;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        if (scanner.hasNextLine()) {
            String input = scanner.nextLine();
            
            // カンマ区切り、空白無視して整数に分割し、重複を除く集合を作成する
            java.util.Set<Integer> uniqueNumbers = input.replaceAll("\\s+", "").split(",")
                .stream()
                .filter(s -> !s.isEmpty())
                .map(Integer::parseInt)
                .collect(java.util.stream.Collectors.toSet());
            
            // 個数と合計を計算
            long count = uniqueNumbers.size();
            long sum = uniqueNumbers.stream().mapToInt(n -> n).sum();
            
            System.out.println("count=" + count + " sum=" + sum);
        } else {
            System.out.println("count=0 sum=0");
        }
    }
}
