import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String countLine = br.readLine();
        if (countLine == null) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        int count = 0;
        long sum = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            try {
                // 1行目に読み取れた個数（count）を更新するのではなく、
                // 実際に読み取れた整数のみを対象とする。
                // 課題の仕様に従い、1行目を個数として扱い、2行目以降を読み取る。
                // ただし、問題文の「実際に読み取れた整数だけを対象とする」という点を重視し、
                // 1行目の値は無視し、続く行をすべて読み取る方針を取る。
                // もし1行目の値が読み取れた個数として厳密に守られるべきなら、
                // 以下の処理でcountを制御する。
                
                // 1行目の値を最初の期待される個数として扱う
                if (count == 0) {
                    count = Integer.parseInt(line);
                }
                
                // 整数を読み取る
                long number = Long.parseLong(line);
                sum += number;
                // 実際に読み取れた整数をカウントする
                count++;
                
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        // 実際に読み取れた個数と合計を出力
        System.out.println("count=" + count + " sum=" + sum);
    }
}
