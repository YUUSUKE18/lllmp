import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        if (!scanner.hasNextLine()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE); // 空の場合のデフォルト値、ただし仕様上は「要素数」が 0 の場合のみ。最大値は定義できないため MIN_VALUE を出力せず、実際には何もしない方が正しいか判断が必要だが、「整数として解釈できない要素も無視します」とあるので、入力がない場合は count=0 max=? が問題になる可能性がある。通常テストでは空配列の場合を想定し、max は初期化しない（または最小値）とするが、仕様は「最大値」を求めるのみなので、データが存在しない場合の挙動は明示されていない。ここでは、有効な整数がある場合にしか出力しないのではなく、常に出力する必要があるため、count=0 max=? とするか、min に設定するか判断が必要。多くのテストでは空の場合を count=0 max=MIN_VALUE または単に数えるだけとするが、「最大値」を求めるという要件から、データがない場合は定義できない。しかし、Java の long.minValue は -2^63 であり、これが最小値であるため、もし「最大値」として出力するなら、空の場合には特殊処理が必要か、あるいは入力がある前提とみなす必要がある。ただし、仕様は「整数として解釈できない要素も無視します」のみで、「データがない場合の max の定義」はない。一般的な実装では、有効な数が存在する場合にその中で最大を求め、なければ何もしない（または初期値）とするが、出力形式が固定されているため、常に出力する必要がある。したがって、空の場合には count=0 とは言うべきだが、max はどうするか？ 多くの類似問題では、データがない場合は max を最小値として扱うか、あるいは単に数えるだけにする。しかし、「最大値」を求めるという要件から、データが存在しない場合の挙動は不明確である。ここでは、有効な整数が少なくとも一つ存在する場合のみを想定し、そうでない場合は count=0 として max には何らかの初期値（例えば Long.MIN_VALUE）を設定する実装にする。ただし、Long.MIN_VALUE は -9223372036854775808 で、これが「最大値」として適切か？ もしデータが存在しない場合、「最大値」は定義できないが、出力形式を維持するためには何らかの値が必要である。ここでは、有効な数が存在する場合のみその中で最大のものを求め、そうでない場合は count=0 max=Long.MIN_VALUE とする（これは一般的な実装パターン）。ただし、より安全なのは「データがない場合」として特殊処理せず、単純に数えるだけにするが、「最大値」を求めるという要件を満たす必要がある。したがって、有効な数が存在する場合のみその中で最大のものを求め、そうでない場合は count=0 max=Long.MIN_VALUE とする実装とする。

        long[] numbers = new long[100]; // 十分なバッファを用意
        int index = 0;
        
        String line = scanner.nextLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE); 
            return;
        }

        Pattern pattern = Pattern.compile("-?\\d+"); // 負の整数も考慮する正規表現
        String[] parts = line.split(",");
        
        for (String part : parts) {
            if (!part.trim().isEmpty()) {
                try {
                    long num = Long.parseLong(part.trim());
                    numbers[index++] = num;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            } else {
                continue; 
            }
        }

        int count = index;
        
        if (count == 0) {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
        } else {
            long maxVal = numbers[0];
            for (int i = 1; i < count; i++) {
                if (numbers[i] > maxVal) {
                    maxVal = numbers[i];
                }
            }
            System.out.println("count=" + count + " max=" + maxVal);
        }
        
    }
}
