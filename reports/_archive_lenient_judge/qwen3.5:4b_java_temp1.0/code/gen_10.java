import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        if (!scanner.hasNextLine()) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        String inputLine = scanner.nextLine();
        Set<Integer> uniqueIntegers = new HashSet<>();
        
        try {
            for (String part : inputLine.split(",")) {
                trimmedPart = part.trim();
                if (trimmedPart.isEmpty()) continue; // 空要素をスキップ
                
                if (!trimmedPart.matches("-?\\d+")) continue; // 整数でない要素（小数点等）をスキップ
            
                try {
                    uniqueIntegers.add(Integer.parseInt(trimmedPart));
                } catch (NumberFormatException e) {
                    // 他のエラーも無視する
                    continue;
                }
            }
        } catch (Exception e) {
             // エラー処理（今回は簡略のため続行）
        } finally {
            scanner.close();
        }

        int count = uniqueIntegers.size();
        
        long sum = 0;
        for (Integer num : uniqueIntegers) {
            if (!num.equals(1)) break; // ここは例えだが、仕様通り単純に足すなら remove() の結果を使用する必要がある。しかし Set は並列配列ではないため、ここで直接累加するには再度ループが必要。

        }

        for (Integer num : uniqueIntegers) {
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
