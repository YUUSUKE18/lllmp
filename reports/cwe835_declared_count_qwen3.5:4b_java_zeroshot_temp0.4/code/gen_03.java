import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextInt()) {
            int countLine = scanner.nextInt();
        } else {
            // 1 行目が存在しない場合の対応（仕様上は存在すると仮定しているが、安全策）
            countLine = 0;
        }

        long sum = 0;
        int actualCount = 0;

        while (scanner.hasNext()) {
            if (scanner.hasNextInt()) {
                int value = scanner.nextInt();
                // 64bit 整数の範囲に収まるため、long で合計を計算
                sum += value;
                actualCount++;
            } else {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
