import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;

public class Main {
    static int[] parseNumbers(String s) {
        ArrayList<Integer> out = new ArrayList<>();
        for (String raw : s.split(",")) {
            String p = raw.trim();
            if (p.isEmpty()) continue;
            try {
                out.add(Integer.parseInt(p));
            } catch (NumberFormatException e) {
                // skip
            }
        }
        int[] r = new int[out.size()];
        for (int i = 0; i < r.length; i++) r[i] = out.get(i);
        return r;
    }

    public static void main(String[] args) throws IOException {
        ByteArrayOutputStream b = new ByteArrayOutputStream();
        byte[] buf = new byte[65536];
        int n;
        while ((n = System.in.read(buf)) > 0) b.write(buf, 0, n);
        String s = b.toString("UTF-8");
        int[] nums = parseNumbers(s);
        long sum = 0;
        for (int x : nums) sum += x;
        System.out.println("count=" + nums.length + " sum=" + sum);
    }
}
