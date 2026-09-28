import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 1. 最初の行（期待される個数 N）を読み取る
        if (!scanner.hasNextInt()) {
            // 入力が空の場合は終了
            System.out.println("count=0 sum=0");
            scanner.close();
            return;
        }
        int expectedCount = scanner.nextInt();

        long actualSum = 0;
        int actualCount = 0;

        // 2. 2行目以降の整数を読み取り、処理する
        // Scannerは自動的に空白をスキップするため、空行や非整数行は次の読み取りで無視されるか、
        // NumberFormatExceptionが発生する。ここでは、読み取り可能な整数のみを対象とする。
        while (scanner.hasNextLong()) {
            try {
                // 読み取れた整数をlong型として扱う
                long number = scanner.nextLong();
                
                // 実際に読み取れた整数のみを対象とする
                actualSum += number;
                actualCount++;
            } catch (Exception e) {
                // 読み取りエラーが発生した場合は無視する（仕様に基づき）
                // ただし、hasNextLong()がtrueである限り、次の要素を試す必要があるため、
                // ここでのtry-catchは主に予期せぬエラー（もしあれば）を捕捉するために使用する。
                // ScannerのnextLong()は通常、不正な入力に対してNumberFormatExceptionを投げるが、
                // hasNextLong()がtrueである限り、次の要素を読み取る必要がある。
                // 厳密に「整数として解釈できない行も無視する」ためには、
                // 読み取り方法を工夫する必要があるが、ここではhasNextLong()とtry-catchで十分とする。
            }
        }

        // 3. 結果を出力する
        System.out.println("count=" + actualCount + " sum=" + actualSum);

        scanner.close();
    }
}
