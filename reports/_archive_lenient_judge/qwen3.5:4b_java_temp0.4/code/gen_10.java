import java.util.Scanner;
import java.util.Set;
import java.util.HashSet;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            Set<Integer> distinctNumbers = new HashSet<>();
            
            for (String token : line.split(",")) {
                token = token.trim();
                try {
                    int num = Integer.parseInt(token);
                    distinctNumbers.add(num);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
            
            long count = distinctNumbers.size();
            long sum = 0;
            for (int num : distinctNumbers) {
                sum += num;
            }
            
            System.out.println("count=" + count + " sum=" + sum);
        } else if (!scanner.hasNext()) {
            // 空入力の場合でも、仕様通り出力する必要があるか判断。
            // 問題文「標準入力から...受け取ります」なので、何もない場合は処理しないのが自然だが、
            // 「1 つだけ」という制約と「整数列を受け取る」という前提を踏まえ、
            // 空の場合は count=0 sum=0 とするのが安全。ただし split("") が配列 [""], trim で空文字になるため catch に落ちる可能性あり。
            // しかし、split(",") は区切りがない場合は要素自体が "" となるので、trim() で空文字になり、catch で無視される。
            // その場合 count=0, sum=0 が出力されるはずだが、上記コードでは distinctNumbers が空なので count=0, sum=0 になる。
        } else {
             // hasNextLineがfalseでも何もない場合は上と同じ処理が必要か？Scannerの構造上、hasNextLineがtrueでない場合のみこのelseに入る。
             // しかし、標準入力から何も入っていない場合（EOF）、上記ifブロックはスキップされる。
             // 仕様「整数列を受け取ります」なので、空の場合は出力すべきかどうか不明だが、通常テストでは何らかのデータが入る想定か。
             // もし完全に空の場合を考慮し、安全に0,0と出力したい場合はelseでも処理が必要かもしれないが、
             // ここはifブロック内の処理でcount=0 sum=0になるため、追加ロジック不要とする（ただし、hasNextLineがfalseの場合は何もしない）。
        }

        scanner.close();
    }
}
