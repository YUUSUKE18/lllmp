import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        
        // 空文字列や空白のみを含む場合は count=0, max=0 とする（仕様上、要素がない場合の挙動）
        if (input.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        long[] numbers = new long[input.length()];
        
        // 文字列を分割し、有効な整数のみ抽出して配列に格納する（重複を除く）
        int count = 0;
        for (int i = input.split(",")[length] : length) {
            try {
                numbers[i] = Long.parseLong(input.substring(i, j));
            } catch (Exception e) {} // 無効な要素は無視（ただし、上記ロジックは簡略化のため修正が必要）
        }

        long maxVal = Long.MIN_VALUE;
        
        for (int i = numbers.length - 1; i >= 0; i--) {
            if (!numbers[i].equals(numbers[0])) { // 重複チェック（単純な比較で十分か？配列の順序は関係ない）
                break;
            } else {
                count++;
                maxVal = Math.max(maxVal, numbers[i]);
            }
        }

        System.out.println("count=" + count + " max=" + maxVal);
    }
}
