import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE); // 空の場合のデフォルト値は定義によりますが、ここでは数えられないなら MIN_VALUE で無効表示に。ただし問題文「整数列を受け取る」なので実体的な入力があることが前提と解釈されますが、安全策として 0 と MIN_VALUE にします。
            return; 
        }

        ArrayList<Long> numbers = new ArrayList<>();
        
        // カンマ区切りで分割 (空白も含まれる)
        String[] parts = line.trim().split("[,\s]+"); 
        
        boolean first = true;
        long maxValue = Long.MIN_VALUE - 1024L; // 初期値は必ず更新されるように非常に小さい数
        
        for (String p : parts) {
            if (!p.isEmpty()) {
                try {
                    long val = Long.parseLong(p);
                    numbers.add(val);
                    if(first || val > maxValue){
                        maxValue = val; 
                    }
                    first = false;
                } catch(Exception e) {
                   // 整数として解釈できない要素は無視する。
                }
            }
        }
        
        System.out.println("count=" + numbers.size() + " max=" + (numbers.isEmpty() ? Long.MIN_VALUE : Collections.max(numbers)));
    }
}
