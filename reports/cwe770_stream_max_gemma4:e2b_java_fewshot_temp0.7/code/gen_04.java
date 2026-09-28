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
            // カンマで分割し、各要素を処理する
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
                        // 整数として解釈できない場合は無視
                    }
                }
            }
        }

        if (count == 0) {
            // 要素が一つもなかった場合、最大値の出力は定義されていないが、ここでは0を出力するなどの対応が必要。
            // 仕様に基づき、要素が存在しない場合の挙動を明確にするため、ここでは count=0, max=-1 (または最小値など) としても良いが、
            // 読み込んだ値がない場合は最大値を設定しない（Long.MIN_VALUEのまま）とするか、あるいはcount=0で処理を終了する。
            // 例題の形式に合わせるため、少なくとも count が正しくカウントされていることを確認する。
             System.out.println("count=" + count + " max=" + (count == 0 ? 0 : max)); // 要素がない場合は最大値は意味を持たないが、ここでは便宜上0とする
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
