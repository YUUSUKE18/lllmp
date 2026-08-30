import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) throws Exception {
        String s = new String(System.in.readAllBytes(), StandardCharsets.UTF_8);
        String[] parts = s.split(",");
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String w : parts) {
            // 前後の空白をトリムして空でないかチェック
            String trimmedW = w.trim();
            if (!trimmedW.isEmpty()) {
                try {
                    long n = Long.parseLong(trimmedW);
                    count++;
                    if (n > max) {
                        max = n;
                    }
                    foundNumber = true;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視
                }
            }
        }

        if (count == 0) {
            // 要素が一つも数値でなかった場合、maxは未定義になるため処理をスキップするか、適切なデフォルト値を設定する。
            // 仕様上は「要素数」と「最大値」を求めるので、データがない場合は count=0, max=何か（ここでは問題の意図に従い、実質的に何も出力しないか、あるいは最悪値を出力するが、今回は数値が存在しない場合の挙動を明示しないため、入力された数値のみに基づくと解釈し、要素数0で終了とする）
            // 例外的なケースとして、もしデータが全くなかった場合は count=0, max=? となるが、ここでは読み込んだ有効な数値に基づいて計算した結果を出力する。
            // 少なくとも、有効な数値が一つでもあれば出力する。
            // データがない場合は何も出力しない（またはcount=0, max=???を出すが、今回は数値を抽出したデータのみに基づくため、count=0ならmaxの出力は不要と判断し、次の行に進むか、もし入力があった場合は必ず出力する設計にする）
            if (s.trim().isEmpty()) {
                // 入力が空だった場合も考慮して、何も出力しない（または count=0, max=?? の形になるが、ここでは実質的な最大値を求められた結果としてゼロや特定の値を出力するのが一般的だが、仕様に従い数値を抽出した結果のみを出力する）
                return;
            }
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
