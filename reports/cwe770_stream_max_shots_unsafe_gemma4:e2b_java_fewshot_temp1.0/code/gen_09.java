import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) throws Exception {
        String s = new String(System.in.readAllBytes(), StandardCharsets.UTF_8);
        // カンマで分割
        String[] parts = s.split(",");
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean foundValidNumber = false;

        for (String part : parts) {
            String trimmed = part.trim();
            if (!trimmed.isEmpty()) {
                try {
                    long n = Long.parseLong(trimmed);
                    count++;
                    if (n > max) {
                        max = n;
                    }
                    foundValidNumber = true;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視
                }
            }
        }

        if (count == 0) {
            // 要素が一つも有効な整数でなかった場合、最大値をどうするか。
            // 仕様上、要素数を0、最大値は定義されない（または最小値）となるが、
            // 少なくとも最初の数値を基準にするのが自然か。
            // ここでは、読み込んだ有効な数値が存在する場合のみ count と max を出力する。
            // ただし、要素数が0の場合は count=0, max=-1 などとするなど、明確な定義が必要だが、
            // 例に従い、もし何も読み取れなかったら、count=0, max=0 とする（または最小値を維持）。
            // 読み込んだ有効な数がない場合は、count=0, max=0 で出力する。
             System.out.println("count=0 max=0"); // 空入力の場合のデフォルト処理
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
