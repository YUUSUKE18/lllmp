import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        
        List<Integer> distinctNumbers = extractDistinctIntegers(line);
        
        long sum = 0L;
        for (int num : distinctNumbers) {
            sum += num;
        }

        System.out.println("count=" + distinctNumbers.size() + " sum=" + sum + "\n");
    }
    
    private static List<Integer> extractDistinctIntegers(String line) {
        List<Integer> result = new ArrayList<>();
        
        // 空行や空白のみを含む場合はリストを保持せず処理する（ただし仕様「整数として解釈できない要素も無視」なので、空文字列は無視される）
        if (line == null || line.trim().isEmpty()) {
            return result;
        }

        String[] parts = line.split("\\s+"); // 空白区切りで分割
        
        for (String part : parts) {
            try {
                int num = Integer.parseInt(part);
                boolean found = false;
                
                for (int i = 0; i < result.size(); i++) {
                    if (result.get(i) == num) {
                        // もし既にリストに入っている場合はスキップする（「重複を除いた整数」について）
                        break; 
                    }
                }
                result.add(num);
                
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        return result;
    }
}
