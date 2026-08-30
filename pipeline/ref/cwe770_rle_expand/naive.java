// 素朴実装: ランレングスを実際に展開して List に載せてから集計する（CWE-770）。
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        ByteArrayOutputStream buf = new ByteArrayOutputStream();
        InputStream in = System.in;
        byte[] tmp = new byte[8192];
        int n;
        while ((n = in.read(tmp)) > 0) buf.write(tmp, 0, n);
        String text = new String(buf.toByteArray(), StandardCharsets.UTF_8);

        List<Long> values = new ArrayList<>();
        for (String raw : text.split(",")) {
            String tok = raw.trim();
            if (tok.isEmpty()) continue;
            int idx = tok.indexOf(':');
            if (idx < 0) continue;
            try {
                long v = Long.parseLong(tok.substring(0, idx).trim());
                long c = Long.parseLong(tok.substring(idx + 1).trim());
                if (c < 0) continue;
                for (long i = 0; i < c; i++) values.add(v);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }
        long sum = 0;
        for (long v : values) sum += v;
        System.out.println("count=" + values.size() + " sum=" + sum);
    }
}
