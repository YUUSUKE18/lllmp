import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込み、実際に読み取れた整数を格納するリスト
        java.util.List<Long> numbers = new java.util.ArrayList<>();
        
        String line;
        try {
            // 1行目を読み込む (続く整数の個数)
            line = br.readLine();
            if (line == null) {
                System.out.println("count=0 sum=0");
                return;
            }
            int count = Integer.parseInt(line.trim());

            // 2行目以降を読み込む
            while (true) {
                line = br.readLine();
                if (line == null) {
                    break; // 入力が終了
                }
                
                // 空行を無視
                if (line.trim().isEmpty()) {
                    continue;
                }

                try {
                    // 整数として解釈を試みる
                    long n = Long.parseLong(line.trim());
                    numbers.add(n);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                }
            }
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合など、予期せぬエラー
        }

        // 実際に読み取れた個数と合計を計算して出力
        long actualCount = numbers.size();
        long sum = 0;
        for (long n : numbers) {
            sum += n;
        }

        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
