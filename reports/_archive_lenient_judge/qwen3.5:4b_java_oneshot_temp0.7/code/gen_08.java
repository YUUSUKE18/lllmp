import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> uniqueNumbers = new HashSet<>();
        int count = 0;
        long totalSum = 0;

        String[] parts = line.split(",");
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                // プラス号子付きの数値を受け付けるため、Integer.valueOf を使用し符号を保持する必要があるが、
                // 問題文は「整数」のみとあるので単純にパースしても良い。
                // ただし Java の Integer.parseInt はプラス/マイナスをサポートするのでそのまま使う。
                String trimmedPart = part.trim();
                if (trimmedPart.isEmpty()) continue;

                int num = Integer.parseInt(trimmedPart);
                
                // 重複チェック（Set に入っていない場合のみカウント）
                uniqueNumbers.add(num);
                
                count++;
                totalSum += num;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        System.out.println("count=" + count + " sum=" + totalSum);
    }
}
