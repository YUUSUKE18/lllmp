import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        Set<Integer> distinctNumbers = new HashSet<>();
        
        if (line != null && !line.isEmpty()) {
            for (String part : line.split(",")) {
                part = part.trim();
                if (!part.isEmpty()) {
                    try {
                        int num = Integer.parseInt(part);
                        // 整数が重複を除いて集められるか？ 
                        // 問題文の意図として「重複を除いた整数」について個数を数えるため、
                        // 同じ値が出ても1回だけカウントします。
                        distinctNumbers.add(num);
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視する
                    }
                }
            }
        }

        int count = distinctNumbers.size();
        
        long sum = 0;
        for (int n : distinctNumbers) {
            sum += n;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
