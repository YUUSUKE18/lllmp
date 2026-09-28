import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) {
            System.out.println("pairs=0");
            return;
        }

        long target;
        try {
            target = Long.parseLong(line.trim());
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }

        List<Long> numbers = new ArrayList<>();
        String nextLine;

        // 2行目以降を読み込む
        while ((nextLine = br.readLine()) != null) {
            String trimmedLine = nextLine.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }
            try {
                long num = Long.parseLong(trimmedLine);
                numbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        int count = 0;
        int n = numbers.size();

        if (n >= 2) {
            // 2つの組 (a, b) が存在するように、2つの異なるインデックス i, j (i != j) を探す
            for (int i = 0; i < n; i++) {
                for (int j = i + 1; j < n; j++) {
                    if (numbers.get(i) + numbers.get(j) == target) {
                        count++;
                    }
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
