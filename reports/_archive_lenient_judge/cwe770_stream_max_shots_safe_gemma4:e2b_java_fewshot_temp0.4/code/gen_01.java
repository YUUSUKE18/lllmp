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
                } else if (b >= '0' && b <= '9') {
                    long num = 0;
                    for (int j = i; j < n; j++) {
                        int currentByte = buf[j] & 0xff;
                        if (currentByte >= '0' && currentByte <= '9') {
                            num = num * 10 + (currentByte - '0');
                        } else {
                            break;
                        }
                    }
                    if (num > 0) {
                        if (!foundFirst || num > max) {
                            max = num;
                            foundFirst = true;
                        }
                    }
                }
            }
        }

        // 最後の要素の処理（入力がカンマで終わる場合や、最後に数値がある場合に対応するため）
        // この実装では、カンマ区切りの整数列を読み取る際に、カンマを区切りとして数え、
        // 数値そのものを抽出して最大値を求めるロジックに修正する必要があります。

        // 再度、より堅牢な方法で処理します。入力全体を文字列として扱い、分割するのが最も簡単です。
        // ただし、例題の形式に従い、バイト配列から直接処理する制約があるため、
        // 既存のロジックを「カンマ区切りの整数列」に特化させます。

        // --- 再実装 ---
        count = 0;
        max = Long.MIN_VALUE;
        boolean first = true;
        long currentNum = 0;
        boolean inNumber = false;

        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;

                if (b == ',') {
                    // カンマが見つかった場合、直前の数値が確定したと見なす（ただし、空要素は無視）
                    if (inNumber) {
                        count++;
                        if (first || currentNum > max) {
                            max = currentNum;
                        }
                        currentNum = 0;
                        inNumber = false;
                    }
                } else if (b >= '0' && b <= '9') {
                    // 数字を読み込む
                    currentNum = currentNum * 10 + (b - '0');
                    inNumber = true;
                } else if (b != ' ' && b != '\t' && b != '\n' && b != '\r') {
                    // 空白やその他の文字は無視（仕様に従う）
                    inNumber = false;
                }
            }
        }

        // 最後の要素の処理
        if (inNumber) {
            count++;
            if (first || currentNum > max) {
                max = currentNum;
            }
        }

        if (count == 0) {
            // 要素が一つもなかった場合、最大値は定義できないか、あるいは最小値として扱う。
            // ここでは、要素がない場合は count=0, max=0 とするのが自然だが、
            // 入力が空だった場合の挙動を明確にするため、もし入力が完全に空なら 0 を出力する。
            max = 0; // 要素が一つもなかった場合は最大値を 0 とする（またはエラー処理）
        } else {
            // 最初の要素が存在しない場合 (例: ",1,2") は count が正しくカウントされるはず。
            // もし入力が空でなければ、少なくとも max は何らかの有効な値を持つ。
            if (!first && max == Long.MIN_VALUE) {
                 // カウントはされたが、数値が全て負の値だった場合などを考慮する必要があるが、
                 // 64bit整数として読み取ったため、最大値は正しく更新されているはず。
            }
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
