import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        Set<Integer> uniqueSet = new HashSet<>();
        
        if (line != null) {
            // 空白とカンマで分割し、有効な整数のみをフィルタリングして集合に登録する
            for (String token : line.split(",")) {
                String trimmedToken = token.trim();
                try {
                    int num = Integer.parseInt(trimmedToken);
                    uniqueSet.add(num);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        }
        
        long count = uniqueSet.size();
        long sum = 0;
        
        for (int num : uniqueSet) {
            sum += num;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
