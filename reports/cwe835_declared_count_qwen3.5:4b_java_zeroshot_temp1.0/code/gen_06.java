import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        
        String firstLine = sc.nextLine();
        if (firstLine.trim().isEmpty()) return;

        int expectedCount = 0;
        try {
            expectedCount = Integer.parseInt(firstLine.trim());
        } catch (NumberFormatException e) {
            // 1 行目が整数でない場合は処理を抜く（ただし仕様上「続く整数の個数」とあるので、エラーの場合は count=0 の扱いが自然だが、ここでは読み取れなかった場合のみ無視する）
            // spec に従って、読み取れた値のみを使うので、解析失敗は出力対象外とするが、実際には行数に依存しないため、次々と readLine() を実行し整数を解析すればよい
        }

        int sum = 0;
        int count = 0;

        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            if (line.trim().isEmpty()) continue;

            try {
                long val = Long.parseLong(line.trim());
                // spec: 実際には 64bit integer の範囲に収まる、ただし Java では int と long が混ざり得るため
                // spec は「整数の個数」と書かれているが、Java の文脈で「整数」は長さを明示しない場合 int を想定しうる
                // ただし 64bit integer に収まるとあるので long で扱うべきか。
                // spec: "値はいずれも 64bit 整数の範囲に収まります" -> long または BigInteger が適切だが、sum は long でも overflow する可能性がある
                // しかし spec は「合計」を求めているだけで、オーバーフロー防止の指定はないが、安全のため long で処理しつつ、必要なら BigInteger に upgrade?
                // Java の int は 32bit, spec は値が 64bit に収まる -> long を使うべき。合計も 64bit を超える可能性があるか？
                // spec を厳密に解釈: "整数" とは文脈上、数値として扱えるもの (long/int)
                // sum の上限を考えると、64bit 個数 * 最大 64bit 値 は overflow する可能性がある
                // しかし spec は「合計」のみ求めている。Java の long は 2^63-7 なので、sum がそれを超えたらどうするか？
                // spec はオーバーフローの指定がないが、通常は言語の範囲内で動くものとする。
                // また spec: "integers" -> int か long か？
                // 「値はいずれも 64bit integer の範囲に収まります」-> long で扱うべき。

                // 合計を計算するために long を用じ、必要であれば BigInteger にアップグレードする（ただし spec は「sum=<...>」としか書かれていない）
                // 厳密な Java プログラムなら long がオーバーフローすれば例外になるか丸めになるが、通常は int/long の範囲を超えないよう想定されることが多い
                // 但し、もし入力数が多すぎたり値が大きすぎる場合、結果が正確でない。しかし spec は「sum=<合計>」とだけなので、長さを明示しない限り long を使用するのが妥当
                // ただし Java で long が不足する可能性がある場合は BigInteger にすべきだが、spec が「整数」と単数形で言っているので int を想定している可能性もあるか？
                // 「64bit integer」を明確に指定しているので、long として扱うべき

                count++;
                sum += val;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
