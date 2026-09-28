import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundFirst = false;

        if (line != null) {
            // カンマで分割し、各要素を処理
            String[] parts = line.split(",");
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    try {
                        long n = Long.parseLong(trimmedPart);
                        count++;
                        if (!foundFirst || n > max) {
                            max = n;
                            foundFirst = true;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視
                    }
                }
            }
        }

        // 要素が見つかった場合のみ出力（問題の制約から、入力が空の場合も考慮する必要があるが、ここでは読み込んだ値に基づいて計算する）
        if (count > 0) {
            System.out.println("count=" + count + " max=" + max);
        } else {
            // 入力が空または無効な場合。最大値の定義に注意が必要だが、入力が0個ならmaxをどうするか。
            // 通常、要素がない場合は count=0, maxの出力は文脈によるが、ここでは読み込んだデータに基づいて出力する。
            // 厳密には「整数列を受け取る」ため、何も読み込めなかった場合はcount=0, maxは未定義となるが、
            // 例に従い計算された値を出力する。もし入力が空なら count=0, maxの初期値(Long.MIN_VALUE)が出力されることになる。
            // 課題の意図を汲み取り、要素が存在しない場合はcount=0で適切に処理すると解釈する。
            System.out.println("count=0 max=" + Long.MIN_VALUE); // または適切なデフォルト値
        }
    }
}
