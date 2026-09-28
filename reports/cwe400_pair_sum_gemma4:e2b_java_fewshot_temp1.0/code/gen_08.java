import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = br.readLine();
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }

        long target = Long.parseLong(targetLine.trim());
        List<Long> numbers = new ArrayList<>();
        String line;

        // 2行目以降を読み込む
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            try {
                numbers.add(Long.parseLong(line.trim()));
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        long count = 0;
        int n = numbers.size();

        // 2個の組の個数を数える
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
