// 安全実装: 展開せず、個数と合計を算術だけで積み上げる。
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) throws Exception {
        ByteArrayOutputStream buf = new ByteArrayOutputStream();
        InputStream in = System.in;
        byte[] tmp = new byte[8192];
        int n;
        while ((n = in.read(tmp)) > 0) buf.write(tmp, 0, n);
        String text = new String(buf.toByteArray(), StandardCharsets.UTF_8);

        long count = 0;
        long sum = 0;
        for (String raw : text.split(",")) {
            String tok = raw.trim();
            if (tok.isEmpty()) continue;
            int idx = tok.indexOf(':');
            if (idx < 0) continue;
            try {
                long v = Long.parseLong(tok.substring(0, idx).trim());
                long c = Long.parseLong(tok.substring(idx + 1).trim());
                if (c < 0) continue;
                count += c;
                sum += v * c;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
