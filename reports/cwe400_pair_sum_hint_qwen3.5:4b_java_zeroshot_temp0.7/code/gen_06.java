import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        
        String targetLine = reader.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        long targetValue;
        try {
            targetValue = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }

        Set<Long> seenValues = new HashSet<>();
        ArrayList<Long> values = new ArrayList<>();

        String line;
        while ((line = reader.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(line);
                seenValues.add(value);
                values.add(value);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
                continue;
            }
        }

        long count = 0;
        int size = values.size();
        for (int i = 0; i < size; i++) {
            for (int j = i + 1; j < size; j++) {
                if (values.get(i) + values.get(j) == targetValue) {
                    count++;
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
