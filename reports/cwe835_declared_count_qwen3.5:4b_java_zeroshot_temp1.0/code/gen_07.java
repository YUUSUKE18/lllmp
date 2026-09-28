import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextInt()) {
            int countInput = scanner.nextInt();
        } else {
            // 1 行目が整数でない場合は処理を続行するが、仕様通り整数のみを読み取るため
            // スキップして次の行を確認。ただし、1 行目そのものが空ならスキップされるべきだが、
            // 通常は int を試みるので空の場合に例外や無視が必要。
            // しかし、「整数として解釈できない行も無視します」なので、
            // ここでは countInput が未定義な状態を避けるため何もせず、
            // 以下のスキャンを継続し実際に見つかった数えを基準にする必要がある。
        }

        long sum = 0;
        int actualCount = 0;
        
        while (scanner.hasNext()) {
            if (scanner.hasNextLine()) {
                String line = scanner.nextLine().trim();
                if (line.isEmpty()) {
                    continue; // 空行を無視
                }
                
                try {
                    BigInteger value = new BigInteger(line);
                    sum += value.longValue(); // 64bit の範囲であるとの前提より long で計算
                    actualCount++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行を無視
                    continue;
                }
            } else {
                break;
            }
        }

        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
