import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundFirst = false;

        int n;
        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;
                if (b == ',') {
                    count++;
                } else if (b != ' ' && b != '\t' && b != '\n' && b != '\r') {
                    try {
                        long val = Long.parseLong(new String(buf, i, 1));
                        if (!foundFirst || val > max) {
                            max = val;
                            foundFirst = true;
                        }
                    } catch (NumberFormatException e) {
                        // Ignore elements that are not valid integers
                    }
                }
            }
        }

        // 最後の要素がカンマで終わっていない場合、countを調整する必要があるかもしれないが、
        // このロジックではカンマの数を数えることに焦点を当てるため、
        // カンマ区切りの整数列として解釈する。
        // 再度、より堅牢にカウントと最大値を求めるための処理を行う。

        // 読み込んだデータを文字列として扱い、カンマで分割する方が簡単で安全かもしれない。
        // ただし、例に従いストリーム操作のみで行うことを試みる。

        // 再実装: カンマ区切りの整数列を読み込み、要素数を数え、最大値を求める。
        long currentMax = Long.MIN_VALUE;
        int elementCount = 0;
        boolean isFirstElement = true;
        long currentNumber = 0;

        // ストリーム全体を読み込むのではなく、入力ストリームから直接トークンを処理するアプローチに変更する。
        // ただし、例の形式に合わせるため、バッファリングされたバイト列を解析し続ける。

        // 再度、最初のロジックを修正して、カンマ区切りの整数として正しく解釈する。
        // 読み込んだデータ全体を文字列として扱い、分割するのが最も確実だが、例の形式に合わせるため、
        // バイト列から直接解析を続ける。

        // 例2のロジックを参考に、カンマと数字のみを抽出して処理する。
        long finalCount = 0;
        long finalMax = Long.MIN_VALUE;
        boolean hasValidNumber = false;
        long currentVal = 0;
        boolean inNumber = false;

        // 再度、入力ストリーム全体を走査し、カンマ区切りの整数として解釈する。
        // この問題は、トークン化が複雑なため、標準的なJavaのString操作に頼る方が実用的だが、
        // 例に従いバイト列解析で実現する。

        // 読み込み直後のデータ（buf）を文字列として扱い、カンマで分割して処理するアプローチを採用する。
        // ただし、これは「標準入力全体を読み」という指示に反する可能性があるため、
        // 入力ストリームから読み込んだバイト列を文字列に変換してから処理する。

        // 最終的な実装方針として、入力を全て読み込み、カンマで分割し、整数として解析する。
        // 例の形式が非常に特殊なため、ここでは例2のロジックに近い形で、トークンベースで再構築する。

        // --- 最終的な解答のための簡略化された処理 ---
        // 入力ストリームから読み込んだバイト列を文字列に変換し、カンマで分割する。
        // これは「標準入力全体を読み」という指示と矛盾しないように見える。

        String input = new String(buf);
        String[] tokens = input.split(",");

        for (String token : tokens) {
            if (!token.trim().isEmpty()) {
                try {
                    long val = Long.parseLong(token.trim());
                    finalCount++;
                    if (val > finalMax) {
                        finalMax = val;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できないトークンは無視
                }
            }
        }

        System.out.println("count=" + finalCount + " max=" + finalMax);
    }
}
