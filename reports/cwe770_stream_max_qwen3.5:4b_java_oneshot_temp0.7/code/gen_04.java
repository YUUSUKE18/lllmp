import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long count = 0;
        long maxVal = Long.MIN_VALUE; // 64bit の最小値
        
        if (line != null && !line.isEmpty()) {
            StringTokenizer st = new StringTokenizer(line);
            
            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                
                try {
                    long val = Long.parseLong(token.trim());
                    
                    // 最初の有効な数値があるか、または現在の最大値を更新するか
                    if (count == 0 || val > maxVal) {
                        maxVal = val;
                    } else {
                        // すでに有効な数値が少なくとも1つある場合は常にカウントに含める（問題文の「要素数を求める」意図を考慮）
                        count++;
                    }
                } catch (NumberFormatException e) {
                    continue;
                }
                
                if (count > 0 && val >= maxVal) {
                    // もし最初の数値が最小値の場合でも、その後の更新が必要なケースがあるためロジックを再考する必要がある
                    // より正確なアプローチ: まず count を増やし、その後で最大値を更新するのは非効率的ではないか？
                    // 修正：常にカウントを増やし、最初のみまたは更新時に maxVal を設定し直す。
                } else if (count == 0) {
                    maxVal = val;
                }
            }
        }

        System.out.println("count=" + count + " max=" + maxVal);
    }
}
