import java.util.Scanner;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Set<Integer> uniqueNumbers = new HashSet<>();

        if (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            // 空白のみが空の行の場合、処理をスキップする必要があるため再度チェック
            while (!line.isEmpty() && !line.matches("\\s*")) ; 
            if (!line.isEmpty()) {
                uniqueNumbers.addAll(java.util.stream.Stream.of(line.split(","))
                    .filter(s -> s.trim().isEmpty() || !isInteger(s.trim()))
                    .map(Integer::parseInt)
                    .collect(java.util.stream.Collectors.toSet()));
            }
        }

        int count = 0;
        long sum = 0L; // 合計は長型で計算するが、仕様では整数として解釈されるため、実際には Set に Integer が格納されているので配列の和を積算できる。ただし、重複を除いた個数と合計なので、Set のサイズが count であり、要素の総和が sum となる。
        
        // しかし、上記のロジックは正しくない。正しいアプローチ：
        // Set に一意な整数のみを入れるので、その size が count で、Sum() が sum を返すことができるか？
        // Java の Integer.Set は Sumable なものではないため、手動で合計を計算する必要がある。

        for (int num : uniqueNumbers) {
            count++;
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }

    private static boolean isInteger(String str) {
        if (str == null || str.trim().isEmpty()) return false;
        try {
            Integer.parseInt(str); // 文字列が整数に変換できるなら true とみなす（例外をキャッチせず）
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
