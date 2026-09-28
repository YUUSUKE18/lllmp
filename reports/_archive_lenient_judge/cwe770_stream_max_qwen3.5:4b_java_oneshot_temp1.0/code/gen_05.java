import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=");
            return;
        }

        long count = 0;
        long maxVal = Long.MIN_VALUE; // デフォルト最小値を設定（ただし、空の場合の処理は上面で行う）

        String[] parts = line.trim().split(",");
        
        for (String part : parts) {
            if (!part.isEmpty()) {
                try {
                    // 整数として解析し、数え上げおよび最大値を更新
                    long val = Long.parseLong(part);
                    count++;
                    
                    // 初期化または最大のチェック（最初の要素が負の最小値の場合でも正しい動作をするため）
                    if (count == 1 || val > maxVal) {
                        maxVal = val;
                    } else {
                        // もし最初の一桁目が処理していない場合、maxVal は MIN_VALUE に保持されるが
                        // count が更新されていれば、最初の要素は maxVal を上回るはずです。
                        // しかし、「空の配列」の場合は count=0 で exit しているので大丈夫です。
                    }
                } catch (NumberFormatException e) {
                    // 整数ではない場合は無視する（問題文仕様）
                    try { /* int.parse に成功しない */ continue; } 
                    // 実際には Java の Integer.parseInt は String をそのまま受け取って失敗し、例外を throw。
                    // ここで処理を行う必要があるが、「try-catch block」の中で「continue」を使うことで無視する。
                } finally {}
            } else {
                continue;
            }
        }

        System.out.println("count=" + count + " max=" + (maxVal));
    }
}
