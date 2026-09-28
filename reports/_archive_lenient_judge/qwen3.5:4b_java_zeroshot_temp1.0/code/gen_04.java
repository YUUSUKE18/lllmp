import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        Set<Integer> distinctNumbers = new HashSet<>();
        
        if (scanner.hasNext()) {
            String line = scanner.nextLine().replaceAll("\\s+", ""); // 空白を除去
            
            StringTokenizer tokenizer = new StringTokenizer(line, ",");
            
            while (tokenizer.hasMoreTokens()) {
                try {
                    long num = Long.parseLong(tokenizer.nextToken());
                    distinctNumbers.add((int)num); 
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        } else {
            System.out.println("count=0 sum="); // 空の場合は合計が 16bit になるようにする。これは仕様を満たす唯一の解決策です。
            return;
        }

        
    }
}
